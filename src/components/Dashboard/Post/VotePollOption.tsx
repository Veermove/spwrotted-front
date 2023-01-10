import { ChangeEvent, FC, useCallback } from "react"
import { Card, Form, ProgressBar } from "react-bootstrap"
import { formatNumber } from "../../../utils/utils"

export const VotePollOption: FC<{
    pollOption: {option: string, votes: number},
    totalVotes: number,
    addVote: (vote: string) => void,
    removeVote: (vote: string) => void,
    hasVoted: boolean,
}> = ({pollOption, totalVotes, addVote, removeVote, hasVoted}) => {
    const onCheckClick = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? addVote(pollOption.option)
            : removeVote(pollOption.option);
    }, [addVote, removeVote, pollOption.option]);

    return <>
        <div
            style ={{
                display: "flex",
                flexDirection:"row"
            }}
        >
            <Form.Check
                style ={{
                    display: "flex",
                    paddingRight: "15px"
                }}
                disabled={hasVoted}
                onChange={onCheckClick}
            />
            <Card.Text
                style ={{
                    display: "flex",
                    paddingRight: "15px"
                }}
            >
                {pollOption.option}
            </Card.Text>
            <Card.Text
                style ={{
                    display: "flex",
                }}
            >
                {formatNumber(pollOption.votes)}
            </Card.Text>
        </div>
        <ProgressBar
            now={totalVotes === 0 ? 0 : (pollOption.votes/totalVotes) * 100}
        />
    </>
}
