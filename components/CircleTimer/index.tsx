import { CircularProgress } from "@chakra-ui/react";

const CircleTimer = (props: any) => {

    return (
        <CircularProgress
            trackColor="rgb(227, 147, 68)"
            min={0}
            max={60}
            value={props.value}
        />
    );
}

export default CircleTimer;