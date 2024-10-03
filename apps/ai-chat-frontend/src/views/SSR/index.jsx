import { useState } from "react";

const useSSR = () => {
    const [ssr, setSsr] = useState(<div>hi</div>);

    return {
        ssr,
        setSsr,
    };
};

export default function SSR() {
    const { ssr, setSsr } = useSSR();

    return (
        <div>
            {ssr}
            <button onClick={() => {
                const newSsr = <div>new ssr</div>;
                setSsr(prevState => {
                    return <>{prevState}{newSsr}</>;
                });
            }}>btn
            </button>
        </div>
    );
}