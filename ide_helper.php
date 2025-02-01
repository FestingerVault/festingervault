<?php

/**
 * Just a PHP file that would help IDE to not show error for functions
 */
/**
 * Check if there is a scheduled action in the queue but more efficiently than as_next_scheduled_action().
 *
 * It's recommended to use this function when you need to know whether a specific action is currently scheduled
 * (pending or in-progress).
 *
 * @since 3.3.0
 *
 * @param string $hook  The hook of the action.
 * @param array  $args  Args that have been passed to the action. Null will matches any args.
 * @param string $group The group the job is assigned to.
 *
 * @return bool True if a matching action is pending or in-progress, false otherwise.
 */
function as_has_scheduled_action($hooks, $args=[], $group="") {return true;}
/**
 * Schedule an action to run one time
 *
 * @param int    $timestamp When the job will run.
 * @param string $hook The hook to trigger.
 * @param array  $args Arguments to pass when the hook triggers.
 * @param string $group The group to assign this job to.
 * @param bool   $unique Whether the action should be unique. It will not be scheduled if another pending or running action has the same hook and group parameters.
 * @param int    $priority Lower values take precedence over higher values. Defaults to 10, with acceptable values falling in the range 0-255.
 *
 * @return int The action ID. Zero if there was an error scheduling the action.
 */
function as_schedule_single_action(...$props) {return 0;}
/**
 * Schedule a recurring action
 *
 * @param int    $timestamp When the first instance of the job will run.
 * @param int    $interval_in_seconds How long to wait between runs.
 * @param string $hook The hook to trigger.
 * @param array  $args Arguments to pass when the hook triggers.
 * @param string $group The group to assign this job to.
 * @param bool   $unique Whether the action should be unique. It will not be scheduled if another pending or running action has the same hook and group parameters.
 * @param int    $priority Lower values take precedence over higher values. Defaults to 10, with acceptable values falling in the range 0-255.
 *
 * @return int The action ID. Zero if there was an error scheduling the action.
 */
function as_schedule_recurring_action(...$props) {return 0;}
