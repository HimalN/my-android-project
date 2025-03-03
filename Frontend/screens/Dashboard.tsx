import {
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Task from "../components/Task";

import { NavigationProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { AppDispatch } from "../store/Store";
import { useDispatch, useSelector } from "react-redux";
import Tasks from "../model/Task";
import { addTask, deleteTask, getTask } from "../reducers/TaskSlice";
export default function Dashboard({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [id, setId] = useState<string>("");
  const [task, setTask] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: { task: Tasks[] }) => state.task);

  const handleDeleteTask = async (id: string) => {
    try {
      console.log("ID: ", id);
      await dispatch(deleteTask(id));
      await dispatch(getTask());
      console.log("Task deleted successfully.");
    } catch (e) {
      console.error("Error deleting Task:", e);
    }
  };

  useEffect(() => {
    if (Array.isArray(tasks) && tasks.length === 0) {
      dispatch(getTask());
    }
  }, [dispatch, tasks]);

  return (
    <View style={styles.container}>
      <View style={styles.taskContainer}>
        <View style={styles.items}>
          {tasks
            .filter(
              (task, index, self) =>
                task && index === self.findIndex((t) => t?.id === task?.id) // Ensure unique task IDs
            )
            .map((task) => (
              <Task
                key={task.id}
                text={task.task}
                onDelete={handleDeleteTask}
                id={task.id}
              />
            ))}
        </View>
      </View>
      <View style={styles.writeTaskWrapper}>
        <TouchableOpacity onPress={() => navigation.navigate("AddTask")}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#30336b",
    flex: 1,
    padding: 20,
  },
  taskContainer: {
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  items: {
    marginTop: 30,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {
    fontSize: 30,
    color: "#55BCF6",
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
