import { useCallback, useEffect, useMemo, useState } from "react";

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
    const { content: content2, writer: writer2 } = useSSR();

    return (
        <div>
            {content}
            {content2}
            <button onClick={async () => {
                const newSsr = <div>new ssr</div>;
                writer.write(newSsr).then();
                writer2.write(newSsr).then();

            }}>btn
            </button>
        </div>
    );
}