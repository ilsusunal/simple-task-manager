"use client";

import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import type { Task, TeamMember } from "@/types/kanban";
import Button from "@/components/ui/Button";
import CustomInput from "@/components/ui/CustomInput";
import Select, { MultiValue, SingleValue } from "react-select";

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newTask: Omit<Task, "id">) => void;
  status: Task["status"];
  teamMembers: TeamMember[];
}

const timeEstimationOptions = [2, 5, 8, 13].map((est) => ({
  value: est.toString(),
  label: `${est} points`,
}));

export default function TaskFormModal({
  isOpen,
  onClose,
  onSave,
  status,
  teamMembers,
}: TaskFormModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [timeEstimation, setTimeEstimation] = useState<number>(2);
  const [selectedAssignees, setSelectedAssignees] = useState<
    Array<{ value: string; label: string }>
  >([]);

  const assigneeOptions = teamMembers.map((member) => ({
    value: member.id,
    label: `${member.fullName} - ${member.title}`,
  }));

  const selectStyles = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDateRange([null, null]);
    setTimeEstimation(2);
    setSelectedAssignees([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateRange[0] || !dateRange[1]) {
      alert("Please select a start and due date");
      return;
    }
    const startDateStr = format(dateRange[0], "yyyy-MM-dd");
    const dueDateStr = format(dateRange[1], "yyyy-MM-dd");
    const assignees = teamMembers.filter((m) =>
      selectedAssignees.some((sa) => sa.value === m.id)
    );

    const newTask = {
      title,
      description,
      startDate: startDateStr,
      dueDate: dueDateStr,
      status,
      assignees,
      timeEstimation,
      category: { name: "", color: "" },
    };

    onSave(newTask);
    resetForm();
    onClose();
  };

  const handleEstimationChange = (
    option: SingleValue<{ value: string; label: string }>
  ) => {
    if (!option) return;
    setTimeEstimation(Number(option.value));
  };

  const handleAssigneesChange = (
    newValue: MultiValue<{ value: string; label: string }>
  ) => {
    setSelectedAssignees([...newValue]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded p-6 w-full max-w-xl shadow relative">
        <h2 className="text-xl font-bold mb-4">New Task in {status}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <CustomInput
            label="Title"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            required
          />
          <CustomInput
            label="Description"
            as="textarea"
            rows={3}
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
          />
          <div>
            <label className="block font-semibold mb-1">Start & Due Date</label>
            <ReactDatePicker
              selected={dateRange[0]}
              onChange={(update) => {
                setDateRange(update as [Date | null, Date | null]);
              }}
              startDate={dateRange[0]}
              endDate={dateRange[1]}
              selectsRange
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Time Estimation</label>
            <Select
              options={timeEstimationOptions}
              value={timeEstimationOptions.find(
                (opt) => Number(opt.value) === timeEstimation
              )}
              onChange={handleEstimationChange}
              menuPortalTarget={document.body}
              styles={selectStyles}
              className="w-full"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Assignees</label>
            <Select
              isMulti
              options={assigneeOptions}
              value={selectedAssignees}
              onChange={handleAssigneesChange}
              menuPortalTarget={document.body}
              styles={selectStyles}
              className="w-full"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
