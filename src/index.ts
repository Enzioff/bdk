import {App} from "./js/app/app";
import "./main/shared/libs/";
import "./main/shared/sprite";
import "./style.scss";

document.addEventListener('DOMContentLoaded', () => {
    console.log('DomContentLoaded');
    new App();
});

window.addEventListener('load', () => {
    console.log("App loaded");
})
