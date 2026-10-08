# Устарел: генератор теперь собирает все языки сразу.
# Используйте:  py tools/build_i18n.py
import runpy, os
runpy.run_path(os.path.join(os.path.dirname(__file__), 'build_i18n.py'), run_name='__main__')
