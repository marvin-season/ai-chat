import { Chat } from "@ai-chat/chat";
import { useChatApproach, useChatPage } from "./hooks/index.js";
import ConversationBar from "./components/ConversationBar.jsx";
import useChatExtend from "./hooks/useChatExtend.jsx";
import { CloseOne, Logout, MenuFoldOne } from "@icon-park/react";
import { useRef } from "react";

export default function ChatPage() {
    const {
        conversations, fetchConversations, deleteConversation, fetchConversationMessages
    } = useChatPage();

    const approachHandle = useChatApproach();

    const chatProps = useChatExtend({
        approachHandle,
        fetchConversations,
        conversations,
    })

    const dialogRef = useRef(null);


    return <>
        <dialog ref={dialogRef} className={"p-4 rounded-lg focus:outline-none"}>
            <div className={"relative flex justify-center h-12 cursor-pointer"}>
                <div>
                    {'会话列表'}
                </div>
                <CloseOne className={"absolute right-0"} onClick={() => {
                    dialogRef.current.close();
                }} />
            </div>
            <div className={"flex-grow overflow-y-scroll bg-gray-100 p-2"} onClick={() => dialogRef.current.close()}>
                <ConversationBar
                    checkoutConversation={chatProps.checkoutConversation}
                    fetchConversations={fetchConversations}
                    conversations={conversations}
                    conversationId={chatProps.conversationId}
                    setHistoryMessages={chatProps.setHistoryMessages}
                    fetchConversationMessages={fetchConversationMessages}
                    deleteConversation={deleteConversation}
                />
            </div>
        </dialog>
        <div className={"fixed top-0 flex-shrink-0 px-4 h-12 bg-white w-full flex justify-between items-center gap-4"}>
            <MenuFoldOne className={"cursor-pointer"} onClick={() => {
                dialogRef.current.showModal();
            }} />
            <Logout className={"cursor-pointer"} onClick={() => {
                sessionStorage.removeItem("token");
                window.location.reload();
            }} />
        </div>
        <div className={"h-[100dvh] pt-6 w-[100%] flex-grow rounded-xl overflow-y-scroll"}>
            <Chat {...chatProps} />
        </div>
            {/*<div className={"flex-1 border rounded-xl p-4 text-white bg-gray-400 flex flex-col"}>*/}
            {/*    <EvalPanel state={approachHandle.state}/>*/}
            {/*</div>*/}


    </>;
}

