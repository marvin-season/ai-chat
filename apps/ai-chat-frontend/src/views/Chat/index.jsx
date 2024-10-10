import {Chat} from "@ai-chat/chat";
import {useChatApproach, useChatPage} from "./hooks/index.js";
import ConversationBar from "./components/ConversationBar.jsx";
import useChatExtend from "./hooks/useChatExtend.jsx";
import { Logout } from "@icon-park/react";

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


    return <>
        <div className={"bg-gradient-to-r from-green-300 to-blue-500  h-screen flex flex-col items-center gap-[1px]"}>
            <div className={"flex-shrink-0 px-4 h-12 bg-white w-full flex justify-end items-center"}>
                <Logout className={"cursor-pointer"} onClick={() => {
                    sessionStorage.removeItem("token");
                    window.location.reload();
                }}/>
            </div>
            <div className={"flex-grow bg-[#fff] w-[100%] p-8 flex gap-4 justify-center overflow-y-scroll"}>
                <div className={"p-4 border rounded-xl bg-gray-400 b flex flex-col w-[300px]"}>
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
                <div className={"flex-[3] w-[50%] border rounded-xl"}>
                    <Chat {...chatProps}/>
                </div>
                {/*<div className={"flex-1 border rounded-xl p-4 text-white bg-gray-400 flex flex-col"}>*/}
                {/*    <EvalPanel state={approachHandle.state}/>*/}
                {/*</div>*/}
            </div>
        </div>

    </>;
}

