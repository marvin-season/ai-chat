export default function BotMessage({ id, prompt }) {console.log({ prompt });
    return <>
        <div key={id} id={id}>
            <span className={"font-bold"}>BOT: </span>
            <span className={"italic"}>{prompt}</span>
        </div>
    </>;
}