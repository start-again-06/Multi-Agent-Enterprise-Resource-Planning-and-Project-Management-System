package projectplanning

// ShortageRisk summarizes the risk level for a material item.
type ShortageRisk struct {
	ItemName      string
	Severity      string
	Reasons       []string
	Recommendation string
}

// AssessShortageRisk evaluates urgency based on lead time and coverage buffer.
func AssessShortageRisk(itemName string, leadTimeDays int, bufferDays int) ShortageRisk {
	risk := ShortageRisk{
		ItemName: itemName,
		Reasons:  []string{"Lead time and buffer values were reviewed."},
	}

	switch {
	case leadTimeDays >= 21 || bufferDays <= 7:
		risk.Severity = "high"
		risk.Recommendation = "Expedite procurement and secure contingency supply immediately."
		risk.Reasons = []string{
			"Lead time exceeds the preferred planning horizon.",
			"Coverage buffer is below the minimum project tolerance.",
		}
	case leadTimeDays >= 10 || bufferDays <= 14:
		risk.Severity = "medium"
		risk.Recommendation = "Monitor supplier delivery and trigger reorder planning early."
		risk.Reasons = []string{
			"Lead time is elevated but still manageable.",
			"Coverage buffer is thin and should be reviewed frequently.",
		}
	default:
		risk.Severity = "low"
		risk.Recommendation = "Continue standard procurement cadence and confirm schedule assumptions."
		risk.Reasons = []string{
			"Lead time and stock buffer remain within normal tolerance.",
		}
	}

	return risk
}
