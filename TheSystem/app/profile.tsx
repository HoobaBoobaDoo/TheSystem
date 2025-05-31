import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ImageBackground,
  Image,
  useWindowDimensions,
  Alert,
} from "react-native";
import GoalCard from "@components/GoalCard";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import TypingText from "@components/TypingText";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { getCurrentUser } from "../utils/auth";
import { User } from "../types/User";

export default function ProfileScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const refresh = async () => {
    const updated = await getCurrentUser();
    if (updated) setUser(updated);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setTimeout(() => setRefreshing(false), 800);
  };

  const classIcons: Record<string, React.ComponentProps<typeof Ionicons>['name']> = {
  Knight: 'shield-checkmark',
  Mage: 'flame',
  Rogue: 'eye-off',
  Archer: 'grid',
  Healer: 'medkit',
  Assassin: 'skull',
};


  const handleAvatarPress = () => {
    Alert.alert(
      "Profile Picture",
      "What do you want to do?",
      [
        {
          text: "Reset to default",
          onPress: async () => {
            if (!user) return;
            const updated = { ...user, profilePicture: "" } as User;
            await AsyncStorage.setItem("currentUser", JSON.stringify(updated));
            setUser(updated);
          },
        },
        {
          text: "Pick from gallery",
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              quality: 1,
            });

            if (!result.canceled && result.assets?.[0]?.uri) {
              if (!user) return;
              const updated = {
                ...user,
                profilePicture: result.assets[0].uri,
              } as User;

              await AsyncStorage.setItem("currentUser", JSON.stringify(updated));
              setUser(updated);
            }
          },
        },
        {
          text: "Take a photo",
          onPress: async () => {
            const result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              quality: 1,
            });

            if (!result.canceled && result.assets?.[0]?.uri) {
              if (!user) return;
              const updated = {
                ...user,
                profilePicture: result.assets[0].uri,
              } as User;

              await AsyncStorage.setItem("currentUser", JSON.stringify(updated));
              setUser(updated);
            }
          },
        },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  return (
    <ImageBackground
      source={require("../assets/neon_stars.jpeg")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          isLandscape && styles.containerLandscape,
        ]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={[styles.overlay, isLandscape && styles.overlayLandscape]}
        >
          {/* ScrollView met gecentreerde content */}
          <ScrollView
            contentContainerStyle={[styles.profileSectionScroll, { alignItems: "center" }]}
          >
            <TouchableOpacity onPress={handleAvatarPress}>
              {user?.profilePicture ? (
                <Image
                  source={{ uri: user.profilePicture }}
                  style={styles.avatar}
                />
              ) : (
                <Ionicons
                  name="person-circle-outline"
                  size={150}
                  style={styles.white}
                />
              )}
            </TouchableOpacity>

            <TypingText style={[styles.name, styles.white]}>
              {user?.fullName || "Unknown Hunter"}
            </TypingText>

            <TypingText style={[styles.bio, styles.white]}>
              I love being productive! That’s why I’m making this app!
            </TypingText>

            <View style={styles.groupInfo}>
              <Ionicons name="person-circle-outline" size={30} style={styles.white} />
              <TouchableOpacity onPress={() => router.push("/clan")}>
                <TypingText style={[styles.groupName, styles.white]}>
                  The productive monkeys
                </TypingText>
              </TouchableOpacity>
            </View>

            <View style={styles.statsRow}>
  <TypingText style={[styles.statText, styles.white]}>
    {user?.rank || "Rank unknown"}
  </TypingText>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Ionicons name={classIcons[user?.class ?? ''] || 'help-circle'} size={16} color="#fff" />
    <TypingText style={[styles.statText, styles.white, { marginLeft: 6 }]}>
      {user?.class || "No class"}
    </TypingText>
  </View>
  <TypingText style={[styles.statText, styles.white]}>
    {user?.level ? `Lvl ${user.level}` : "No level"}
  </TypingText>
</View>


          </ScrollView>
        </View>

        <View
          style={[styles.overlay, isLandscape && styles.overlayLandscape]}
        >
          <View style={styles.cardGrid}>
            <GoalCard
              statKey="pushups"
              value={user?.stats.pushups ?? 0}
              label="pushups"
              refresh={refresh}
            />
            <GoalCard
              statKey="planking"
              value={user?.stats.planking === 0 ? "✓" : `${user?.stats.planking}s`}
              label="Daily planking"
              refresh={refresh}
            />
            <GoalCard value={user?.stats.steps ?? 0} label="steps" />
            <GoalCard
              value={`${user?.stats.dungeonTime ?? 0}s`}
              label="in dungeon"
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

ProfileScreen.screenOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: "100%",
  },
  containerLandscape: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 0,
    marginTop: 0,
  },
  overlay: {
    marginTop: 30,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 12,
    borderRadius: 10,
    flex: 1,
  },
  overlayLandscape: {
    width: "48%",
    marginTop: 0,
  },
  profileSectionScroll: {
    paddingBottom: 16,
    // alignItems: 'center', // Nu inline in component
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "#fff",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bio: {
    textAlign: "center",
    marginVertical: 10,
  },
  groupInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  groupName: {
    fontSize: 14,
    marginLeft: 10,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 12,
  },
  statText: {
    fontSize: 14,
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    height: "45%",
  },
  white: {
    color: "#fff",
  },
});
