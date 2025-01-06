import pandas as pd
import numpy as np
from scipy.stats import norm

# Функция для вычисления среднего эффекта и доверительного интервала
def calculate_confidence_interval(data_file):
    data = pd.read_csv(data_file)
    effect_size = np.mean(data['effect_size'])
    stderr = np.std(data['effect_size']) / np.sqrt(len(data))
    ci_lower = effect_size - 1.96 * stderr
    ci_upper = effect_size + 1.96 * stderr

    print(f"Средний эффект: {effect_size:.2f}")
    print(f"95% доверительный интервал: [{ci_lower:.2f}, {ci_upper:.2f}]")

if __name__ == "__main__":
    # Пример использования
    calculate_confidence_interval("data/meta_analysis/study_data.csv")
