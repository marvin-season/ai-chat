import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import BotMessage from "./components/BotMessage.jsx";
import UserMessage from "./components/UserMessage.jsx";

const useWriteableHTML = () => {
    const [HTMLList, setHTMLList] = useState([]);
    const transformStream = useMemo(() => {
        return new TransformStream();
    }, []);

    const readableStream = useMemo(() => {
        return transformStream.readable;
    }, [transformStream]);

    const writer = useMemo(() => {
        const writableStream = transformStream.writable;
        return !writableStream.locked && writableStream.getWriter();
    }, [transformStream]);


    const readContent = useCallback(async () => {
        if (readableStream.locked) {
            return;
        }
        // 在可写流一端写入数据
        // 从可读流一端读取数据
        for await (const readerElement of readableStream) {
            console.log(readerElement);
            setHTMLList(prevState => {
                if(prevState.at(-1)?.props.id === readerElement.props.id) {
                    return prevState.slice(0, -1).concat(readerElement);
                }
                return prevState.concat(readerElement);
            });
        }
    }, [readableStream]);

    useEffect(() => {
        readContent().then();
        return () => {
        };
    }, [readContent]);

    return {
        html: HTMLList,
        writer,
    };
};



export default function SSR() {
    const { html: HTMLList, writer } = useWriteableHTML();
    const inputRef = useRef();

    return (
        <div className={"flex flex-col gap-4"}>
            <div className={"flex-grow border rounded-lg p-4"}>
                {HTMLList.map(html => html)}
            </div>

            <form action="#" onSubmit={e => {
                e.preventDefault();
                const prompt = inputRef.current.value;
                writer.write(<UserMessage prompt={prompt} id={1}/>).then();
                setInterval(() => {
                    writer.write(<BotMessage prompt={prompt} id={2}/>).then();
                }, 1000);
            }}>

                <input ref={inputRef} className={"border h-12 w-full rounded-lg"} />
            </form>
        </div>
    );
}