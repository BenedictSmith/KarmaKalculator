function calculatePrice() {
    const startTime = document.getElementById("start-time").value;
    const endTime = document.getElementById("end-time").value;
    const rate = parseFloat(document.getElementById("rate").value);

    if (isNaN(rate) || rate <= 0) {
        alert("Please enter a valid rate.");
        return;
    }

    const startTimeArray = startTime.split(":");
    const endTimeArray = endTime.split(":");

    const startHour = parseInt(startTimeArray[0]);
    const startMinute = parseInt(startTimeArray[1]);
    const endHour = parseInt(endTimeArray[0]);
    const endMinute = parseInt(endTimeArray[1]);

    const totalMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
    const totalQuarters = Math.ceil(totalMinutes / 15);

    const quartersBefore18 = Math.min(Math.floor((18 * 60 - (startHour * 60 + startMinute)) / 15), totalQuarters);
    const quartersAfter18 = totalQuarters - quartersBefore18;

    const ratePerQuarter = rate / totalQuarters;

    let totalPrice = 0;
    let debugInfo = "Debug Information:<br>";

    for (let i = 0; i < totalQuarters; i++) {
        const currentQuarter = (startHour * 60 + startMinute) + (i * 15);
        const currentHour = Math.floor(currentQuarter / 60);
        const currentMinute = currentQuarter % 60;

        let currentQuarterPrice = ratePerQuarter; // Standard rate per quarter-hour

        if (i >= quartersBefore18) {
            currentQuarterPrice *= 1.15; // Add 15% for quarters after 18:00
        }

        totalPrice += currentQuarterPrice;

        debugInfo += `Quarter ${i + 1}: ${currentHour}:${currentMinute} - Rate: $${currentQuarterPrice.toFixed(2)}<br>`;
    }

    document.getElementById("result").innerHTML = `Total Price: $${totalPrice.toFixed(2)}`;
    document.getElementById("debug").innerHTML = debugInfo;
}
