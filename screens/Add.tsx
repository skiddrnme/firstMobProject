import React, { useMemo, useRef, useState } from "react";
import {
  InputAccessoryView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { ListItem } from "../components/ListItem";
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import { theme } from "../theme";
import { MaterialIcons } from "@expo/vector-icons";
import { ExpenseList } from "../components/ExpenseList";
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "../store/slices/expensesSlice";
import { selectCategories } from "../store/slices/categorySlice";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Category } from "../types/category";

const Add = () => {
  const [date, setDate] = useState(new Date());
  const categories: Category[] = useSelector(selectCategories); // Указываем тип данных Category[]
  const [expenses, setExpenses] = useState([]);
  const [sheetView, setSheetView] = useState("category");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [category, setCategory] = useState<Category>(
    categories[0] || ({} as Category)
  ); // Указываем тип данных Category и приводим к нему пустой объект, если категорий нет
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const dispatch = useDispatch();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const keyboardRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  const addExpenseHandler = () => {
    const newExpense = {
      note,
      amount: parseFloat(amount),
    };
    dispatch(addExpense(newExpense));
    setAmount("");
    setNote("");
    // Оставляем категорию такой, какой была перед добавлением расхода
  };

  const selectCategory = (selectedCategory: Category) => {
    setCategory(selectedCategory);
    bottomSheetRef.current?.close();
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={112}
        style={{
          margin: 16,
          flex: 1,
          alignItems: "center",
        }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              borderRadius: 11,
              overflow: "hidden",
              width: "100%",
            }}>
            <ListItem
              label="Сумма"
              detail={
                <TextInput
                  placeholder="Сумма"
                  textAlign="right"
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={setAmount}
                  style={{
                    height: 40,
                    color: "white",
                    flex: 1,
                    borderRadius: 39,
                    paddingLeft: 8,
                    fontSize: 16,
                  }}
                  ref={keyboardRef}
                />
              }
            />
            {Platform.OS === "ios" && (
              <ListItem
                label="Дата"
                detail={
                  <DateTimePicker
                    value={date}
                    mode="date"
                    is24Hour={true}
                    themeVariant="dark"
                    maximumDate={new Date()}
                    minimumDate={
                      new Date(
                        new Date().getFullYear() - 1,
                        new Date().getMonth(),
                        new Date().getDate()
                      )
                    }
                    onChange={(event, newDate) => setDate(newDate)}
                    locale={Platform.OS === "ios" ? "ru_RU" : "en_US"}
                  />
                }
              />
            )}
            <ListItem
              label="Запись"
              detail={
                <TextInput
                  placeholder="Запись"
                  textAlign="right"
                  value={note}
                  onChangeText={setNote}
                  style={{
                    height: 40,
                    color: "white",
                    flex: 1,
                    borderRadius: 8,
                    paddingLeft: 8,
                    fontSize: 16,
                  }}
                />
              }
            />
            <ListItem
              label="Категория"
              detail={
                <TouchableOpacity
                  style={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    setSheetView("category");
                    bottomSheetRef.current?.snapToIndex(1);
                  }}>
                  <Text
                    style={{
                      color: category?.сolor || "white", // Если цвет категории не определен, используем белый цвет
                      textTransform: "capitalize",
                      fontSize: 16,
                    }}>
                    {category?.name || "Выберите категорию"}{" "}
                    {/* Если имя категории не определено, используем текст "Выберите категорию" */}
                  </Text>
                </TouchableOpacity>
              }
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity
          onPress={addExpenseHandler}
          style={{
            backgroundColor: theme.colors.primary,
            paddingHorizontal: 20,
            paddingVertical: 13,
            borderRadius: 10,
            marginTop: 32,
          }}>
          <Text style={{ color: "white", fontWeight: "600", fontSize: 17 }}>
            Добавить расход
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <BottomSheet snapPoints={snapPoints}>
          <View>This is awesome!</View>
      </BottomSheet>
      {/* <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={snapPoints}>
        <BottomSheetView style={{ backgroundColor: theme.colors.card }}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={{ padding: 18 }}
              onPress={() => selectCategory(item)}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    backgroundColor: item.сolor,
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                  }}
                />
                <Text style={{ color: "white", fontSize: 18, marginLeft: 12 }}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </BottomSheetView>
      </BottomSheet> */}
    </>
  );
};

export default Add;
