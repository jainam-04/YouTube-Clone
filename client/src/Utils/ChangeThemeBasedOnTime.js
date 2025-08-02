const southernStates = [
      "Andhra Pradesh",
      "Karnataka",
      "Kerala",
      "Tamil Nadu",
      "Telangana"
];

const changeThemeBasedOnTime=(state)=>{
      const now = new Date();
      const hour = now.getHours();
      const isMorning = hour >= 10 && hour < 12;
      const isSouth = southernStates.includes(state);
      if(isMorning && isSouth){
            return "Light_Theme";
      }
      return "Dark_Theme";
}

export default changeThemeBasedOnTime;