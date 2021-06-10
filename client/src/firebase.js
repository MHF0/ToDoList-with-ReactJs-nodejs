import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyChvyMHy9uGauBeC6ZIhZ2b_3Zkc18P1mQ",
	authDomain: "tetra-39f86.firebaseapp.com",
	databaseURL: "https://tetra-39f86.firebaseio.com",
	projectId: "tetra-39f86",
	storageBucket: "tetra-39f86.appspot.com",
	messagingSenderId: "596400212598",
	appId: "1:596400212598:web:81ce79fab2a4fd97e26d57",
	measurementId: "G-YRENS2GR4S"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
