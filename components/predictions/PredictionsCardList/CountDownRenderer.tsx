import {
    Flex,
} from '@chakra-ui/react';

type CountDownRendererProps = {
    hours: number,
    minutes: number,
    seconds: number,
    days: number,
    completed: boolean,
}

const CountDownRenderer = ({
    hours,
    minutes,
    seconds,
    days,
    completed,
}: CountDownRendererProps) => {
    if (completed) {
        // Render a complete state
        return (
            <Flex
                color={'#FF4D00'}
            >
                Expired
            </Flex>
        )
    } else {
        // Render a countdown

        return (
            <Flex
                color={'#8DE104'}
            >
                {days > 0 ? days + 'd ' : ''}
                {hours < 10 ? "0" + hours : hours}h{" "}
                {minutes < 10 ? "0" + minutes : minutes}m{" "}
                {seconds < 10 ? "0" + seconds : seconds}s
            </Flex>
        );
    }
};

export default CountDownRenderer;