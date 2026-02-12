import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const VotingV1Module = buildModule("VotingV1Module", (m) => {
    const voting = m.contract("VotingV1");

    return { voting };
});

export default VotingV1Module;
