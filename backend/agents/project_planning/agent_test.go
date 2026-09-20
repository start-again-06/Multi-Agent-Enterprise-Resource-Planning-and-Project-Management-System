package projectplanning

import "testing"

func TestNewAgentUsesProjectPlanningDefaults(t *testing.T) {
	agent := NewAgent()
	if agent == nil {
		t.Fatal("expected agent to be created")
	}
	if agent.Name != "project_planning" {
		t.Fatalf("expected default name to be project_planning, got %q", agent.Name)
	}
	if agent.Role == "" {
		t.Fatal("expected an agent role")
	}
	if agent.Prompt == "" {
		t.Fatal("expected a default prompt")
	}
}
