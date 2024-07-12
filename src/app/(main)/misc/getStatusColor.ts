type StatusProp = "Approved" | "Lost" | "Scheduled" | "Decrease" | "COMPLETED" | "Rejected" | "Ongoing" | "Closed" | "Pending" | "Completed" | "Successful" | "successful" | "Increase" | "Failed" | "failed" | "active" | "away" | "offline" | "New Request"| "On-Hold" | "Active" | "Offline" | "Reversed" | "available"| "Available" |"Overdue" | "Repaid" | "overdue" | "Missed" | "Open" | "Open To Supervisor" | "Awaiting Crc Verification"|"Processing" | "Unassigned" | "Assigned" | "unassigned" | "assigned"

const statusColors: Record<StatusProp, string> = {
    "Approved": "#169301",
    "COMPLETED": "#169301",
    "Completed": "#169301",
    "Assigned": "#169301",
    "assigned": "#169301",
    "Successful": "#169301",
    "Available": "#169301",
    "available": "#169301",
    "Repaid": "#169301",
    "successful": "#169301",
    "Scheduled": "#169301",
    "Increase": "#169301",
    "active": "#169301",
    "Active": "#169301",
    "New Request": "#169301",
    "Rejected": "#E80000",
    "Failed": "#E80000",
    "Missed": "#E80000",
    "overdue": "#E80000",
    "Overdue": "#E80000",
    "On-Hold": "#E80000",
    "Open": "#063898",
    "failed": "#E80000",
    "Open To Supervisor": "#1fa4de",
    "Awaiting Crc Verification": "#0A6847",
    "Decrease": "#E80000",
    "Processing": "#FF6500",
    "offline": "#E80000",
    "Offline": "#E80000",
    "Reversed": "#E80000",
    "Lost": "#E80000",
    "Ongoing": "#E48900",
    "Closed": "#667085",
    "Pending": "#E48900",
    "Unassigned": "#E48900",
    "unassigned": "#E48900",
    "away": "#E48900"
};

function capitalizeText(text: string): string {
    return text.replace(/\b\w/g, char => char.toUpperCase());
}
export function getStatusColor(status: StatusProp | string): string {
    // Check if status exists in the mapping, otherwise return default color
    return statusColors[capitalizeText(status) as StatusProp] || "#E48900";
}
