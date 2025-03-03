import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

type TaskProps = {
  text: string;
  onDelete: (id: string) => void;
  id: string
};

const Task: React.FC<TaskProps> = ({ text, onDelete, id }) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity style={styles.square}></TouchableOpacity>
        <Text style={styles.itemText}>{text}</Text>
      </View>
      {/* Red circle delete button */}
      <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(id)}>
        <Text style={styles.deleteText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#686de0",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    shadowColor: "#000",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#6ab04c",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
    color: "white",
    fontWeight: "bold",
  },
  deleteButton: {
    width: 30,
    height: 30,
    backgroundColor: "red",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Task
