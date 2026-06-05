const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {

    const file = path.join(process.cwd(), "data.json");

    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, "{}");
    }

    let data = JSON.parse(fs.readFileSync(file, "utf8"));

    const input = (req.query.message || "").trim();

    // Learn Mode
    if (input.includes("=")) {

        const parts = input.split("=");

        const question = parts[0].toLowerCase().trim();
        const answer = parts.slice(1).join("=").trim();

        data[question] = answer;

        fs.writeFileSync(
            file,
            JSON.stringify(data, null, 2)
        );

        return res.send("Learned");
    }

    // Chat Mode
    const key = input.toLowerCase();

    if (data[key]) {
        return res.send(data[key]);
    }

    return res.send("Teach Me");
};
