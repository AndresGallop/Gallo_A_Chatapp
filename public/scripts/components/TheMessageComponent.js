export default {
    props: ['msg', 'socketid'],

    template:
    `
    <article class="new-message" :class="{ 'my-message' : matchedID }">
        <h4 class="persona">{{msg.message.name}}:</h4>
        <p class="contenido">{{msg.message.content}}</p>  
    </article>
    `,

    data: function() {
        return {
            matchedID: this.socketid == this.msg.id
        }
    }
}