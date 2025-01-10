function StartChat() {
  return (
    <div className=" h-[calc(100vh-64px)]  ">
      <div className="flex flex-col items-center justify-center h-full bg-gray-100 text-gray-600">
        <div className="text-3xl font-semibold mb-4">No Chat Selected</div>
        <p className="text-lg text-center">
          Select a chat from the list to start a conversation, or create a new
          one.
        </p>
        <div className="mt-6">
          <img
            src="https://via.placeholder.com/300x200?text=No+Chat+Selected"
            alt="No chat selected"
            className="w-64 h-auto rounded-md shadow-md"
          />
        </div>
      </div>
    </div>
  );
}

export default StartChat;
