Penetration.configure do
  preset(:notify) { ->(message) { "<script>Notifier.notify('#{message}')</script>" } }
  preset(:alert) { ->(message) { "<script>Notifier.alert('#{message}')</script>" } }
end