import { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Tasks from "../model/Task";
import { addTask, getTask } from "../reducers/TaskSlice";
import { AppDispatch } from "../store/Store";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function AddTask({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  function generateId() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `T-${year}${month}${day}-${hours}${minutes}${seconds}`;
  }

  const [id, setId] = useState<string>(generateId());
  const [task, setTask] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const handleAddTask = async () => {
    console.log(id);

    console.log(task);
    const newTask = new Tasks(id, task);
    try {
      await dispatch(addTask(newTask));
      await dispatch(getTask());
      navigation.navigate("Dashboard");
      console.log("Vehicle data saved successfully.");
    } catch (e) {
      console.error("Error saving vehicle data:", e);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={"Write a task"}
        value={task}
        onChangeText={(text) => setTask(text)}
      />{" "}
      <View style={styles.button}>
        <Button title="Add Task" onPress={handleAddTask} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, 
    backgroundColor: "#30336b"
  },
  button: {
    marginTop: 20,
    width: 100,
  },
  input: {
    padding: 15,
    paddingHorizontal: 25,
    backgroundColor: "#FFF",
    borderRadius: 10,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
});
