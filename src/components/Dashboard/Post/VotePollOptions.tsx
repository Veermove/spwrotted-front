import { FC, useCallback, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { voteInPoll } from "../../../utils/EntityStoreClient";
import { VotePollOption } from "./VotePollOption";

export const VotePollOptions: FC<{
    pollOptions: {option: string, votes: number}[],
    postId: string,
    disabled: boolean,
}> = ({pollOptions, postId, disabled}) => {

    const [statePollOptions, setStatePollOptions] = useState(pollOptions);
    const [totalVotes, setTotalVotes] = useState(
        statePollOptions
            .map((c) => c.votes)
            .reduce((c, v) => c + v, 0)
    )

    const [hasVoted, setHasVoted] = useState(false);
    const [votedOptions, setVotedOptions] = useState<string[]>([]);

    const addVote = useCallback((votedOption: string) => {
        setVotedOptions([...votedOptions, votedOption])
    }, [votedOptions, setVotedOptions]);
    const removeVote = useCallback((votedOption: string) => {
        setVotedOptions( votedOptions.filter((v) => v !== votedOption))
    }, [votedOptions, setVotedOptions])

    const submitVotes = useCallback(async () => {
        try {
            const { newPollOptions, total } = await voteInPoll(votedOptions, postId);
            setStatePollOptions(newPollOptions)
            setHasVoted(true);
            setTotalVotes(total);
            console.log(total);
        } catch (e) {
            console.log(e);
        }
    }, [votedOptions, postId, setHasVoted, setStatePollOptions, setTotalVotes])

    return <>
        <ListGroup
            style={{
                paddingTop:"30px",
            }}
        >
            {statePollOptions
                .map((pollOption) => (
                    <ListGroup.Item
                        key={pollOption.option}
                    >
                        <VotePollOption
                            pollOption={pollOption}
                            addVote={addVote}
                            removeVote={removeVote}
                            totalVotes={totalVotes}
                            hasVoted={hasVoted}
                            disabled={disabled}/>
                    </ListGroup.Item>
                ))}
            <ListGroup.Item>
                <Button
                    disabled={disabled || hasVoted}
                    onClick={(e) => {submitVotes()}}
                >Submit votes</Button>
            </ListGroup.Item>
        </ListGroup>
    </>
}
