import classes from "./logistics-item.module.css";
import SVGIcon from "../icons/SVGIcon";

function LogisticsItem(props) {
  const { icon: Icon } = props;

  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <SVGIcon name="address" />
      </span>
      <span className={classes.content}>{props.children}</span>
    </li>
  );
}

export default LogisticsItem;
