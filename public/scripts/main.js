import ChatMessage from "./components/TheMessageComponent.js";
(() => {
    console.log('fired');

    // load the socket library and make a connection
    const socket = io();

    // messenger service event handling -> incoming from the manager
    function setUserId({sID, message}) {
        // incoming connected event with data
        // debugger;  
        vm.socketID = sID;
    }

    function appendMessage(message) {
        vm.messages.push(message);
    }

    const vm = new Vue({
        data: {
            messages: [], //these are the messages received
            nickname: "",
            username: "",
            socketID: "",
            message: ""   //these are the messages sent
        },

        created: function() {
            console.log('its alive!!');
        },

        methods: {
            dispatchMassage() {
                //debugger;
                socket.emit('chatmessage', { content: this.message, name: this.nickname || "Anonymus" });

                this.message = "";
            }
        },

        components: {
            newmessage: ChatMessage
        }
    }).$mount("#app");

    socket.addEventListener("connected", setUserId);
    socket.addEventListener('message', appendMessage);
})();