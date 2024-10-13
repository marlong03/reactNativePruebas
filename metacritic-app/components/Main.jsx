import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const icon = require("../assets/icon.png");

export function Main() {
  const [games, setGames] = useState([]);
  const insets = useSafeAreaInsets();
  useEffect(() => {
    const getLatestGames = async () => {
      try {
        const response = await fetch(
          "https://rickandmortyapi.com/api/character/",
        );
        const data = await response.json();
        setGames(data.results); // Asumiendo que los personajes están en `data.results`
      } catch (error) {
        console.error(error);
      }
    };

    getLatestGames();
  }, []);

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <ScrollView>
        {games.map((game) => (
          <View key={game.id} style={styles.card}>
            <Image
              source={{ uri: game.image }}
              style={styles.image}
              blurRadius={1}
            />
            <Text style={styles.title}>{game.name}</Text>
            <Text style={styles.description}>{game.location.name}</Text>
            <Text style={styles.description}>{game.status}</Text>
            <Text style={styles.score}>{game.species}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  
  textoStyle: {
    color: "red",
  },
  card: {
    margin: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 20,
    width: 100,
    color: "#000", // Cambiado a negro para mejor visibilidad
  },
  score: {
    fontSize: 15,
    color: "#000", // Cambiado a negro para mejor visibilidad
  },
  image: {
    width: 100,
    height: 100,
  },
});
