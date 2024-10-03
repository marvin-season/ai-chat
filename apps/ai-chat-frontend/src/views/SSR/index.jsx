import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const useContent = () => {
    const [content, setContent] = useState("");
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
        console.log("readableStream", readableStream);
        if (readableStream.locked) {
            return;
        }
        // 在可写流一端写入数据
        // 从可读流一端读取数据
        for await (const readerElement of readableStream) {
            console.log(readerElement);
            setContent(prevState => {
                return <>
                    {prevState}{readerElement}
                </>;
            });
        }
    }, [readableStream]);

    useEffect(() => {
        readContent().then();
        return () => {
        };
    }, [readContent]);

    return {
        content,
        writer,
    };
};


const useSSR = () => {
    const content = useContent();

    return {
        ...content,
    };
};

export default function SSR() {
    const { content, writer } = useSSR();
    const inputRef = useRef();

    return (
        <div className={"flex flex-col gap-4"}>
            <div className={"flex-grow border rounded-lg p-4"}>
                {content}
            </div>

            <form action="#" onSubmit={e => {
                e.preventDefault();
                const prompt = inputRef.current.value;
                const content = <div>
                    <span className={"font-bold"}>USER: </span>
                    <span>{prompt}</span>
                </div>;
                writer.write(content).then();

                setTimeout(() => {
                    writer.write(<div>
                        <span className={"font-bold"}>BOT: </span>
                        <span className={"italic"}>{prompt}</span>
                    </div>).then();
                }, 1000);
            }}>

                <input ref={inputRef} className={"border h-12 w-full rounded-lg"} />
            </form>
        </div>
    );
}