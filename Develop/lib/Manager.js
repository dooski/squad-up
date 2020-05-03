const Employee = require("./Employee")

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.name;
        this.id;
        this.email;
        this.officeNumber = officeNumber;
    };
    getRole() {
        return "Manager"
    };
    getOfficeNumber() {
        return this.officeNumber
    };

};

module.exports = Manager;