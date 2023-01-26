import Button from "../lib/src/components/Button";
import TextInput from "../lib/src/components/TextInput";
import styles from "./Demo.module.css";

function Demo() {
  return (
    <div>
      <h1>Ui Library</h1>
      <small>liew-i-library</small>
      <hr />

      <div>
        <h2>Button</h2>
        <div className={styles.grid}>
          <Button onClick={() => console.log("hi")}>Default</Button>
          <Button type="solid" onClick={() => console.log("hi")}>
            Solid
          </Button>
          <Button disabled onClick={() => console.log("hi")}>
            Disabled
          </Button>
          <Button size="sm" onClick={() => console.log("hi")}>
            small
          </Button>
          <Button size="lg" onClick={() => console.log("hi")}>
            large
          </Button>
        </div>
      </div>

      <div>
        <h2>TextInput</h2>
        <div className={styles.grid}>
          <TextInput
            label="This is a Label"
            extra="some extra info"
            placeholder="This is a textinput"
          />
          <TextInput label="Disabled Textinput" disabled />
          <TextInput
            label="Multiline Textinput"
            placeholder="Multline input"
            multiline
          />
        </div>
        <div className={styles.grid}>
          <TextInput
            size="sm"
            label="This is a small input"
            extra="some extra info"
            placeholder="This is a textinput"
          />
          <TextInput
            label="Large Textinput"
            placeholder="large text"
            size="lg"
          />
          <TextInput
            label="Search Textinput"
            size="lg"
            leftIcon="search"
            placeholder="Search"
          />
        </div>
      </div>
    </div>
  );
}

export default Demo;
