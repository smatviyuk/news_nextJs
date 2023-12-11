'use client'

import ReactTimeAgo from "react-timeago";

type Props = {
  time: string
}

const LiveTimestapm = ({time}: Props) => {
  return (
    <ReactTimeAgo date={time}/>
  );
};

export default LiveTimestapm;