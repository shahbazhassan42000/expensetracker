document.addEventListener("DOMContentLoaded", function () {
    const total_balance = document.getElementById("total-balance");
    const total_income = document.getElementById("total-income");
    const total_expense = document.getElementById("total-expense");
    const title = document.getElementsByName("transaction_title")[0];
    const amount = document.getElementsByName("transaction_amount")[0];
    const add_btn = document.getElementsByName("add_btn")[0];
    const history = document.getElementById("history");
    const history_box = document.getElementById("history-box");
    const transaction = document.getElementById("transaction");
    const transaction_form = document.getElementsByName("transaction")[0];
    let records = []

    add_btn.addEventListener("click", function (event) {
        event.preventDefault()
        let transaction_amount = +(amount.value);
        if(transaction_amount===0){
            alert("ERROR!!! zero amount is entered");
            /*** CLEARING FORM FIELDS ***/
            amount.value="";
            title.value="";
        }
        else{
            let row = []
            row.push(title.value); /*** ADDING TRANSACTION TITLE IN HISTORY ***/

            if (transaction_amount > 0) {
                /*** ADDING IN INCOME ***/
                total_income.innerText = ((+total_income.innerText) + transaction_amount).toString();
                /*** ADDING TRANSACTION TYPE IN HISTORY ***/
                row.push("INCOME");
            } else {
                /*** ADDING IN EXPENSE ***/
                total_expense.innerText = ((+total_expense.innerText) + transaction_amount).toString();
                /*** ADDING TRANSACTION TYPE IN HISTORY ***/
                row.push("EXPENSE");
            }
            /*** ADDING TRANSACTION AMOUNT IN HISTORY ***/
            row.push(transaction_amount);
            /*** UPDATING TOTAL BALANCE ***/
            total_balance.innerText = ((+total_income.innerText) + (+total_expense.innerText)).toString();
            /*** CLEARING FORM FIELDS ***/
            amount.value="";
            title.value="";
            alert("Transaction added successfully");
            /*** ADDING TRANSACTION IN HISTORY ***/
            records.push(row);
            insert_transaction_record(row);
        }
    });

    /*** TOGGLING TRANSACTION AND HISTORY BOXES ***/
    transaction.addEventListener("click", function () {
        if (transaction_form.style.display === "none") {
            transaction_form.style.display = "flex";
            history_box.style.display = "none";
        } else {
            transaction_form.style.display = "none";
        }
    });
    history.addEventListener("click", function () {
        if (history_box.style.display === "none") {
            history_box.style.display = "flex";
            transaction_form.style.display = "none";
        } else {
            history_box.style.display = "none";
        }
    });

    /*** ADDING TRANSACTION IN HISTORY ***/
    function insert_transaction_record(record) {
        /*** CREATING TITLE ***/
        let title = document.createElement("H2");
        title.innerText = record[0];
        history_box.appendChild(title);
        /*** CREATING ROW ***/
        let row = document.createElement("DIV");
        row.setAttribute("class","history-row");
        /*** CREATING TRANSACTION TYPE ***/
        let type = document.createElement("H2");
        if(record[1]==="INCOME")
            type.setAttribute("class","pad");
        type.innerText=record[1];
        row.appendChild(type);
        /*** CREATING AMOUNT ***/
        let amount = document.createElement("H2");
        if(record[1]==="INCOME")
            amount.setAttribute("class","green");
        else
            amount.setAttribute("class","red");
        amount.innerText="$"+record[2].toString();
        row.appendChild(amount);
        /*** INSERTING IN HISTORY BOX ***/
        history_box.appendChild(row);
    }
});