import { FC } from "react";
import { Card, Form, FormLabel, ListGroup } from "react-bootstrap";
import { SPWRUser } from "../../utils/User";

export const UserDetails: FC<{
    spwrUser: SPWRUser
}> = ({spwrUser}) => {
    return <>
        <Card>
            <Card.Body>
                <ListGroup>
                    <ListGroup.Item
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "baseline",
                            justifyContent: "flex-start"
                        }}
                    >
                        <FormLabel
                            style={{
                                fontWeight: "700",
                                marginRight: "10px"
                            }}
                        >
                            Email:
                        </FormLabel>
                        <Form.Control
                            disabled
                            readOnly
                            type="text"
                            defaultValue={spwrUser.email}
                        />
                    </ListGroup.Item>
                    <ListGroup.Item
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "baseline",
                                justifyContent: "flex-start"
                            }}
                        >
                            <FormLabel
                                style={{
                                    fontWeight: "700",
                                    marginRight: "10px"
                                }}
                            >
                                Name:
                            </FormLabel>
                            <Form.Control
                                disabled
                                readOnly
                                type="text"
                                defaultValue={spwrUser.name}
                            />
                    </ListGroup.Item>
                    <ListGroup.Item
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "baseline",
                                justifyContent: "flex-start"
                            }}
                        >
                            <FormLabel
                                style={{
                                    fontWeight: "700",
                                    marginRight: "10px"
                                }}
                            >
                                PWr Role:
                            </FormLabel>
                            <Form.Control
                                disabled
                                readOnly
                                type="text"
                                defaultValue={
                                    (spwrUser.pwr_association[0] === 1 ? "Professor, " : "")
                                    + (spwrUser.pwr_association[1] === 1 ? "Student" : "")
                                }
                            />
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    </>
}
