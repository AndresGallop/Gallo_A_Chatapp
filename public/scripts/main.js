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
        //vm.username = username;
    }

    // function getnickname(nickname){

        
    // }

    function appendMessage(message) {
        //vm means vue model
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
            
            this.nickname = localStorage.getItem('name');
        },

        methods: {
            dispatchMessage() {
                //debugger;
                socket.emit('chatmessage',
                 { 
                     content: this.message, 
                     name: this.nickname || "Anonymus" 
                });

                this.message = "";
            },

            sendname() {
               // window.localStorage.removeItem('name');
                
               //ESTE WINDOW.LOCALSTORAGE ALMACENA DATA EN EL PC
               var name = document.getElementById("myname").value;

                localStorage.setItem('name', this.nickname);

                //ESTO NOS LLEVA HACIA LA PAGINA
                location.href = '/chat'; 
              }
        },

        components: {
            newmessage: ChatMessage
        }
    }).$mount("#app");
        // define methods under the `methods` object
        
      
      // you can invoke methods in JavaScript too
     // => 'Hello Vue.js!'

    //socket.addEventListener("mandelo", getnickname);
    socket.addEventListener("connected", setUserId);
    socket.addEventListener('message', appendMessage);
})();