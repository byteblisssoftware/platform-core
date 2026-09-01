grant execute on function public.has_permission(uuid, text) to authenticated, service_role;
grant execute on function public.is_participant(uuid, uuid) to authenticated, service_role;