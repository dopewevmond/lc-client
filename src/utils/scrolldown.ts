export const scrollDown = () => {
  const chatBubbleContainer = document.querySelector("#chat-bubble-container");
  setTimeout(() => {
    if (chatBubbleContainer) {
      chatBubbleContainer.scrollTop = chatBubbleContainer.scrollHeight;
    }
  }, 0);
};
