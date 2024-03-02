import { useExampleContext } from '../contexts/ExampleContext';

export default function Layout() {

    // Consume (i.e. acquire, grab, pull, etc) the data
    // from the exampleData var in the ExampleContext.
    // const { exampleData } = useExampleContext();

    return (
        <div className="my-10">
            <h1 className="text-xl">Surf the Urge!</h1>
            <p>Select the amount of time you want to stay focused for</p>
            {/* <h3 className="text-3xl">{exampleData.value}</h3> */}
        </div>
    )
}