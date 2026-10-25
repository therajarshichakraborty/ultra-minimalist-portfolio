export const themeStorageKey = "theme";

export const themeScript = `try{var t=localStorage.getItem("${themeStorageKey}");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t}}catch(e){}`;
