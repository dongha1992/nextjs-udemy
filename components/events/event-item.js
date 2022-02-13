import SVGIcon from "../icons/SVGIcon";
import Button from "../ui/button";
import styles from "./event-item.module.css";
import Image from "next/image";

function EventItem(props) {
  const { title, image, date, location, id, num } = props;

  const humanRedeableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = location.replace(", ", "\n");

  const exploreLink = `/events/${id}`;

  return (
    <li className={styles.item}>
      <Image
        src={image + `0${num + 1}.png`}
        alt={title}
        width={200}
        height={160}
      />
      {/* <img src={image + `0${num + 1}.png`} alt={title} /> */}
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{title}</h2>
          <div className={styles.date}>
            <SVGIcon name="dateIcon" />
            <time>{humanRedeableDate}</time>
          </div>
          <div className={styles.address}>
            <SVGIcon name="dateIcon" />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={styles.icon}>
              <SVGIcon name="dateIcon" />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
