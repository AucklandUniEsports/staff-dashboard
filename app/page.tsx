import InputField from "./components/InputField";
import StandardButton from "./components/StandardButton";

export default function Home() {
  return (
      <div className="landing">
        <section className="content-block">
          <InputField placeholderText="Username"/>
          <InputField placeholderText="Password"/>
        </section>
        <StandardButton title="Sign In." color="lime"/>

      </div>

  );
}
