import Button from "../lib/src/components/Button";
import Calendar from "../lib/src/components/Calendar";
import Dropdown from "../lib/src/components/Dropdown";
import TextInput from "../lib/src/components/TextInput";
import styles from "./Demo.module.css";

function Demo() {
  return (
    <div style={{ padding: `20px` }}>
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
          <Button type="text" onClick={() => console.log("hi")}>
            text
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

      <div>
        <h2>Dropdown</h2>
        <div className={styles.grid}>
          <Dropdown anchor="Dropdown" items={["1", "2", "3"]} />
          <Dropdown
            customAnchor={<Button type="text">Custom Anchor</Button>}
            items={["1", "2", "3"]}
          />
        </div>
      </div>

      <div>
        <h2>Calendar</h2>

        <p>basic calendar</p>
        <Calendar onDateChange={(d) => console.log(d)} />

        <p>on a card</p>
        <Calendar
          card
          onDateHover={(d) => `${d.getDate()} this is a hover menu`}
          dateBottomItem={(d) => "tet"}
        />

        <p>on hover menu that animates with different content sizes</p>
        <Calendar
          card
          onDateHover={(d) => {
            const date = d.getDate();
            return date % 3 === 0 ? (
              <div style={{ minWidth: 300, minHeight: 150 }}>
                <h2>Larger drop down</h2>
                <p>
                  This React Element is sized 300x150 minimum explicitly.
                  Content can be strings or react elements.
                </p>
                <Button type="solid">Learn More</Button>
                <h2 />
              </div>
            ) : date % 2 === 0 ? (
              `less content in this date menu`
            ) : (
              `${d.getDate()} this is a hover menu. there is much more content in this date menu. the menu will risize based on the content!`
            );
          }}
        />

        <p>date range selection mode</p>
        <Calendar selectType="range" />
      </div>
    </div>
  );
}

export default Demo;
