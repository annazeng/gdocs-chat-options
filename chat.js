console.log('loaded chat.js')

function onDomReady(fn) {
  if (document.readyState!='loading') fn();
  else document.addEventListener('DOMContentLoaded', fn)
}

function setup() {
  console.log("setting up");
  var textBox = document.querySelector("textarea.docs-chat-edit-box")

  if (!textBox) {
    setTimeout(setup, 1000);
    return;
  }

  textBox.style.display = "none";

  function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
  }

  function sendChat(chat) {

    textBox.value = chat;

    var event = new CustomEvent('keydown');
    event.keyCode = 13;
    textBox.dispatchEvent(event);
  }

  var chatOptions = htmlToElement(`
    <div id='chat-options'>
      <button>I don't understand that code.</button>
      <button>That code looks too complicated.</button>
      <button>That code looks slow.</button>
    </div>`
  )

  textBox.parentElement.appendChild(chatOptions)

  document.querySelectorAll('#chat-options button').forEach(button => {
    button.addEventListener("click", () => { sendChat(button.textContent) });
  })

  document.body.appendChild(
    htmlToElement(`
      <style>
        #chat-options {
          height: 100px;
          width: 100%;
          padding: 10px;
          background-color: white;
        }

        #chat-options button {
          padding: 5px;
          margin: 0 2px;
        }
      </style>`))

}

onDomReady(setup)

