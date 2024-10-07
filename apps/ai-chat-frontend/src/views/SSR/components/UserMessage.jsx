export default function UserMessage({ id, prompt }) {
    return <>
        <div key={id} id={id}>
            <span className={"font-bold"}>User: </span>
            <span className={"italic"}>{prompt}</span>
        </div>
    </>;
}