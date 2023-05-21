import { setData, domInfo, onMounted } from "@/@strve-sfc/index.js";
import "@/app.css";

// WebSocket实例
let socket = null;

// 数据
export const data = {
  bg: randomRgb(),
  name: new Date().getTime().toString(),
  chatArr: [],
  textValue: "",
  chatbox: null,
  textValueDom: null,
  showStyle: "display:none;",
  send,
  onTextValue,
  useName,
};

// 用户名
function useName(name) {
  const username = name.toString();
  return username.substring(name.length - 5, name.length);
}

// 随机获取头像背景
function randomRgb() {
  let R = Math.floor(Math.random() * 130 + 110);
  let G = Math.floor(Math.random() * 130 + 110);
  let B = Math.floor(Math.random() * 130 + 110);
  return "rgb(" + R + "," + G + "," + B + ")";
}

// WebSocket初始化
function init() {
  if (typeof WebSocket === "undefined") {
    alert("您的浏览器不支持socket");
  } else {
    const path = "wss://www.maomin.club/chatApi/"; // 服务端地址
    socket = new WebSocket(path);

    socket.onopen = () => {
      setData(() => {
        data.showStyle = "display:block;";
      });
      alert("服务连接成功，可以开始聊天啦");
    };
    socket.onerror = () => {
      alert("服务连接错误！");
    };
    socket.onclose = () => {
      alert("服务连接关闭，请重新进入应用");
    };
    socket.onmessage = (msg) => {
      const obj = JSON.parse(msg.data);
      setData(() => {
        data.chatArr.push(obj);
      }).then(() => {
        data.chatbox.scrollTop = data.chatbox.scrollHeight;
      });
    };
  }
}

// 输入内容
function onTextValue(v) {
  data.textValue = v.target.value;
  data.textValueDom.value = "";
}

// 发送消息
function send() {
  if (data.textValue.trim().length > 0) {
    const obj = {
      name: data.name,
      txt: data.textValue,
      bg: data.bg,
    };
    socket.send(JSON.stringify(obj));
    data.textValue = "";
    data.textValueDom.focus();
  }
}

init();

document.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    send();
  }
});

onMounted(() => {
  data.textValueDom = domInfo.textValueDom;
  data.chatbox = domInfo.chatBox;
});
