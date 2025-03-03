import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Task from "./components/Task";
import Navigation from "./components/Navigation";
import { Provider } from "react-redux";
import React from "react";
import { RouterProvider } from "react-router";
import { store } from "./store/Store";

export default function App() {
  return (
    <>
            <Provider store={store}>
              <Navigation/>
            </Provider>
        </>
  )
}
