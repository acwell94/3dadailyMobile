import { useNavigation } from "@react-navigation/native";

const useNav = (page) => {
  const navigation = useNavigation();
  const navigateToPage = () => {
    navigation.navigate(page);
  };
  return navigateToPage;
};

export default useNav;
